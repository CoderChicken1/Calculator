import { useContext } from "react"
import { CalcContext } from "../context/CalcContext"

const getStyleName = btn => {
  const className = {
    '=': 'equals',
    'x': 'opt',
    '-': 'opt',
    '+': 'opt',
    '/': 'opt',
  } // Object className
  return className[btn]
}// tra ve ten equals hoac opt


const Button = ({value}) => {
  const {calc , setCalc} =useContext(CalcContext)
  // User click Button
  const handleClickButton = () => { //hien thi so ra man hinh 
    const numberString = value.toString();
    let numberValue;
    if (numberString ==='0' && calc.num=== 0){

      numberValue='0'
    }
    else{
      numberValue= Number(calc.num + numberString); // bien chuoi thanh so
    }


    setCalc({
      ...calc,
      num: numberValue // gia tri sau cung ra man hinh
    })
  }
  //User click C
  const resetClick = () =>{
    setCalc({sign:"", num: 0, res: 0})
  }

  // User click comma
  const commaClick =()=>{
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
    }
 
    )
  }
  //User Click Operation
  const signClick =()=>{
    setCalc({
    sign: value,
    res : !calc.res && calc.num ? calc.num : calc.res,
    num : 0
    })
  }
  //User click euals "="
  const equalsClick =()=>{
    if (calc.num && calc.res){
      const math = (a,b,sign)=>{
        const result = {
          '+': (a,b) => a+b,
          '-': (a,b) => a-b,
          'x': (a,b) => a*b,
          '/': (a,b) => a/b
        } 
        return result[sign](a,b);
    }
    
    setCalc({
      res : math(calc.res, calc.num, calc.sign),
      num: 0,
      sign:''
    })
  };
  }
  //User click persen
  const persenClick = () => {
    setCalc({
      res : (calc.res/100),
      num: (calc.num/100),
      sign: ""
    })
  }
  //User click +=
  const invertClick = () => {
    setCalc({
      res: calc.res ? calc.res* -1 : 0,
      num: calc.num ? calc.num* -1 : 0,
      sign: ''
    })

  }
  // xu ly Click
  const handleClick = () => {
    const results= {
      '.' : commaClick,
      'C' : resetClick,
      '/' : signClick,
      'x' : signClick,
      '-' : signClick,
      '+' : signClick,
      '=' : equalsClick,
      '%' : persenClick,
      '+-' : invertClick

    }
    if(results[value]) {
      return results[value]()
    } // neu gia tri la . se toi ham commaClick
    else{
      return handleClickButton()
    }
  };

  return (
    <button onClick={handleClick} className={`${getStyleName(value)} button`}>{value}</button>
  )
}
export default Button