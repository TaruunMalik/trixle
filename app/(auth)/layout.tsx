import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign-In/Up",
  description: "Page for User Sign-In/Up",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-full w-full flex justify-center items-center bg-slate-200">
      {children}
    </div>
  );
}
