import { Button } from "@/4_shared/components/ui/button";
import { UserStore } from "@/5_api/store/UserStore";
import { useState } from "react";

export default function SideLists({navToCreate}: {navToCreate: () => void}) {
  const userPer = UserStore((s) => s.permission);

  if (userPer === 'unlogin') {
    return (
      <div className="text-center my-20">Please Login First</div>
    )
  }

  const [list, setList] = useState<string[]>(["류승현", "바보"]);

  return (
    <div className="flex flex-col my-20 mx-1">
      <ul>
        {
          list.map((l, idx) => {
            return (
              <li key={"li" + idx} className="my-2 p-2 border-2 rounded-sm">
                <button className="pl-1 pr-4">⌵</button>
                <button key={"but" + idx}>{l}</button>
              </li>
            )
          })
        }
      </ul>
      <Button onClick={navToCreate} variant={"secondary"} className="my-2">Make a New Page</Button>
    </div>
  )
}