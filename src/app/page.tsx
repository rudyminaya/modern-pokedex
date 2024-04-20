import { StoreProvider } from "@/context/Store"
import TypeLabel from "./components/TypeLabel"

export default function Home() {
  return (
    <StoreProvider>
      <TypeLabel />
    </StoreProvider>
  )
}
