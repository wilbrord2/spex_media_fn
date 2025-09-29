import Image from "next/image";
import { ThemeSwitchButton } from "./components/themeSwitcher";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ThemeSwitchButton />
    </div>
  );
}
