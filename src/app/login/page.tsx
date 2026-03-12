import { WireframeScreen } from "@/components/wireframe-screen";
import { getWireframePage } from "@/lib/wireframes";

export default function Page() {
  return <WireframeScreen screen={getWireframePage("login.html", "login")} />;
}
