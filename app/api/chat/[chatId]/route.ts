import { StreamingTextResponse, LangChainStream } from "ai";

import { auth, currentUser } from "@clerk/nextjs";

import { CallbackManager } from "langchain/callbacks";

import { NextResponse } from "next/server";

import { MemoryManager } from "@/lib/memory";

import { ratelimit } from "@/lib/ratelimit";

import prismadb from "@/lib/prismadb";

import { Replicate } from "langchain/llms/replicate";

export async function POST(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const { prompt } = await request.json();
    const user = await currentUser();

    if (!user || !user.firstName || !user.id) {
      return new NextResponse("No user found!", { status: 400 });
    }

    const identifier = request.url + "-" + user.id;
    const { success } = await ratelimit(identifier);

    if (!success) {
      return new NextResponse("Rate Limit Exceeded", { status: 404 });
    }

    const aiBot = await prismadb.aI.update({
      where: {
        id: params.chatId,
        // userId: user.id,
      },
      data: {
        messages: {
          create: {
            content: prompt,
            role: "user",
            userId: user.id,
          },
        },
      },
    });

    if (!aiBot) {
      return new NextResponse("AI Bot not found", { status: 400 });
    }
    const name = aiBot.id;
    const aiBot_file_name = name + ".txt";

    const aiBot_Key = {
      aiName: name,
      userId: user.id,
      modelName: "llama2-13b",
    };

    const memoryManager = await MemoryManager.getInstance();
    const records = await memoryManager.readLatestHistory(aiBot_Key);
    if (records.length === 0) {
      await memoryManager.seedChatHistory(aiBot.seed, "\n\n", aiBot_Key);
    }

    await memoryManager.writeToHistory("User: " + prompt + "\n", aiBot_Key);
    const recentChatHistory = await memoryManager.readLatestHistory(aiBot_Key);

    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      aiBot_file_name
    );

    let relevantHistory = "";

    if (!!similarDocs && similarDocs.length !== 0) {
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");
    }

    const { handlers } = LangChainStream();
    const model = new Replicate({
      model:
        // "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
        "replicate/llama-2-70b-chat:58d078176e02c219e11eb4da5a02a7830a283b14cf8f94537af893ccff5ee781",
      input: {
        max_length: 2048,
      },
      apiKey: process.env.REPLICATE_API_TOKEN,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });

    model.verbose = true;

    const resp = String(
      await model
        .call(
          `ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${aiBot.name}:prefix.
          Below are the relevant details about ${aiBot.name}'s past \n
            ${aiBot.instructions}
            Below are the relevant details about the conversation you are in:
            ${recentChatHistory}\n${aiBot.name}:
            `
        )
        .catch(console.error)
    );

    const cleaned = resp.replaceAll(",", "");
    const chunks = cleaned.split("\n");
    const response = chunks[0];
    await memoryManager.writeToHistory("" + response.trim(), aiBot_Key);
    var Readable = require("stream").Readable;

    let s = new Readable();
    s.push(response);
    s.push(null);

    if (response !== undefined && response.length > 1) {
      memoryManager.writeToHistory("" + response.trim(), aiBot_Key);

      await prismadb.aI.update({
        where: {
          id: params.chatId,
        },
        data: {
          messages: {
            create: {
              content: response.trim(),
              role: "system",
              userId: user.id,
            },
          },
        },
      });
    }
    return new StreamingTextResponse(s);
  } catch (error) {
    console.log("CHAT POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
