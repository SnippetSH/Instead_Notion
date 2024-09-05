import { Content, InputBlock } from "@/components/ui"

export const MakePage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Content className="" style={{ width: '75%', height: '90%' }}>
        <InputBlock />
      </Content>
    </div>
  )
}