import { useState } from "react"
// import { encrypt } from "./cryptoTools"

export default function () {
  const [before, setBefore] = useState<string>('')
  const [after, setAfter] = useState<string>('')


  const setKey = () => {
    var key = prompt("请输入需要加密的文:", "丁凯乐称霸全世界");
    if (key != null && key != "") {
      setBefore(key)
      // const result = encrypt(key)
      setAfter(encodeURIComponent(key))
    }
  }
  return <div onClick={setKey}>
    <h1>

      加密之前：{before}
    </h1>
    <h3>

    加密之后：{after}
    </h3>
  </div>
}