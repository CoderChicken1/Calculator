import { useContext } from "react"
import { CalcContext } from "../context/CalcContext";
import { Textfit } from 'react-textfit';  // tu dong dieu chinh kich thuoc phong chu

const Screen =() =>{
  const {calc}= useContext(CalcContext);// su dung prop la object tu file khac
   

  return (
    <Textfit className="screen" max={70} mode="single">{calc.num ? calc.num : calc.res}</Textfit>
  )
}

export default Screen 