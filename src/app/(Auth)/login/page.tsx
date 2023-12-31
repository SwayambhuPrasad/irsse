"use client";
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const pathname = usePathname().slice(1);
  const [selected, setSelected] = useState(pathname);
  const [creds, setCreds] = useState({ name: "", email: "", password: "" });

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(e) => setSelected(e as string)}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  onValueChange={(v: string) =>
                    setCreds({ ...creds, email: v })
                  }
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  onValueChange={(v: string) =>
                    setCreds({ ...creds, password: v })
                  }
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link
                    size="sm"
                    onPress={() => {
                      setSelected("sign-up");
                      setCreds({
                        name: "",
                        email: "",
                        password: "",
                      });
                    }}
                  >
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={() =>
                      signIn("credentials", {
                        email: creds.email,
                        password: creds.password,
                        callbackUrl: "/",
                      })
                    }
                    fullWidth
                    color="primary"
                  >
                    Login
                  </Button>
                </div>
                <Button className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                  <Image
                    width={24}
                    height={24}
                    className="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Login with Google</span>
                </Button>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  type="Name"
                  onValueChange={(v: string) => setCreds({ ...creds, name: v })}
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  onValueChange={(v: string) =>
                    setCreds({ ...creds, email: v })
                  }
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  onValueChange={(v: string) =>
                    setCreds({ ...creds, password: v })
                  }
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link
                    size="sm"
                    onPress={() => {
                      setSelected("login");
                      setCreds({ name: "", email: "", password: "" });
                    }}
                  >
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    onClick={async (e) => {
                      e.preventDefault();
                      const response = await fetch("/api/register", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(creds),
                      });
                      const userinfo = await response.json();
                      console.log(userinfo);
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
