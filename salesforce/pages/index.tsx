import type { NextPage } from 'next'
import { Button } from "../components/Button"

const App: NextPage = () => {
  return (
    <>
      <button className="bg-cta text-white p-3 px-6 mx-auto block mt-5 border- border-b-2 rounded-md">Button</button>
      <Button text="Button" />
    </>
  )
}

export default App
