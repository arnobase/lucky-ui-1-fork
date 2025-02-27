import { AccountContext } from "../context/AccountProvider";
import { useContext, useEffect, useRef } from 'react';
import { LottoContractContext } from "../context/LottoContractProvider";
import toast from 'react-hot-toast';

const style = {
  input: `text-center w-8 m-2 border border-sky-500`,
  ball: `w-[2.5rem] h-[2.5rem] pt-[6px] m-1 text-center border-1 rounded-full cursor-pointer`,
  bigball: `w-20 h-20 pt-[0px] text-2xl m-1 text-center border-1 rounded-full bg-gray-600`
};

const LottoParticipateAction = (props) => {
  const { account } = useContext(AccountContext)
  let selected_numbers = props.numbers.sn
  
  const refLottoNb1 = useRef()
  const refLottoNb2 = useRef()
  const refLottoNb3 = useRef()
  const refLottoNb4 = useRef()
  const refLottoNb5 = useRef()
  const { participate, batchParticipate, doParticipateDryRun, doParticipateDryRunRes } = useContext(LottoContractContext)

  const processNumber = (e,ele) => {
    // remove the number if present
    if (selected_numbers.includes(e)) {
      const e_index = selected_numbers.indexOf(e);
      selected_numbers.splice(e_index, 1);
      ele.target.className = style.ball+" border-transparent "
    }
    // add if not present
    else {
      if (selected_numbers.length<5) {
        selected_numbers.push(e)
        ele.target.className = style.ball+" bg-gradient-to-br from-purple-500 to-pink-500 border-pink-600"
      }
    }
    // update numbers array to keep it sorted
    selected_numbers = selected_numbers.sort(function (a, b) {  return a - b;  });
    props.numbers.ssn(selected_numbers)
    // also update the values of the input fields
    refLottoNb1.current.value = selected_numbers[0] ? selected_numbers[0] : ""
    refLottoNb2.current.value = selected_numbers[1] ? selected_numbers[1] : ""
    refLottoNb3.current.value = selected_numbers[2] ? selected_numbers[2] : ""
    refLottoNb4.current.value = selected_numbers[3] ? selected_numbers[3] : ""
    refLottoNb5.current.value = selected_numbers[4] ? selected_numbers[4] : ""
    checkLottoNumbers()
    //setUpdate(new Date())
  }

  const checkLottoNumbers = () => {
    //console.log(e.target.value)
    const numbersOk = 
      (refLottoNb1?.current.value > 0
        && refLottoNb2?.current.value > 0
        && refLottoNb3?.current.value > 0
        && refLottoNb4?.current.value > 0
        && refLottoNb5?.current.value > 0)
      && (refLottoNb1?.current.value <= 50
        && refLottoNb2?.current.value <= 50
        && refLottoNb3?.current.value <= 50
        && refLottoNb4?.current.value <= 50
        && refLottoNb5?.current.value <= 50)
      && (new Set([
        refLottoNb1?.current.value,
        refLottoNb2?.current.value,
        refLottoNb3?.current.value,
        refLottoNb4?.current.value,
        refLottoNb5?.current.value
      ]).size === 5)

    //console.log("numbersOk",numbersOk)
    //console.log("finalNumbers",selected_numbers)

    if (numbersOk===true) {
      //setStateNumbersOk(true)
      //console.log("---___---###---___---###finalNumbers",selected_numbers)
      //setFinalNumbers(selected_numbers)
    }
    else {
      //setStateNumbersOk(false)
    }
  }

  const doParticipate = async (nb) => {
    let error_msg = undefined
    if (account === undefined) {
      error_msg = "Connect account to participate"
    }
    else {
      if (selected_numbers.length < 5) {
        error_msg = "Select 5 numbers"
      }
      else {
        const drres = await doParticipateDryRun(nb)
        //console.log("doParticipateDryRunRes",drres,nb)
        if (drres?.error === undefined) {
          participate(nb)
        }
        else {
          error_msg = drres?.error
        }
      }
    }
    if (error_msg) {
      toast.error(
        error_msg,
        {position: 'bottom-right'}
      )
    }
  }

  //console.log("participateDryRunRes",participateDryRunRes)
  const numbers = []
  for (let index = 1; index <= 50; index++) {
    numbers.push(index)
  }
  return (
  <div className='w-100'>
    <div className="w-96 flex flex-wrap m-auto">
      {numbers.map(e=>(<div key={e} onClick={(ele)=>{processNumber(e,ele)}} className={style.ball+" border-transparent"}>{e}</div>))}
    </div>
    <div className='w-96 m-auto flex place-content-around'>
      <input disabled ref={refLottoNb1}  className={style.bigball} id="refLottoNb1" />
      <input disabled ref={refLottoNb2}  className={style.bigball} id="refLottoNb2" />
      <input disabled ref={refLottoNb3}  className={style.bigball} id="refLottoNb3" />
      <input disabled ref={refLottoNb4}  className={style.bigball} id="refLottoNb4" />
      <input disabled ref={refLottoNb5}  className={style.bigball} id="refLottoNb5" />
    </div >
    <div className="w-60 m-auto cursor-pointer" onClick={() => {doParticipate(selected_numbers)}}>
      <button 
        //disabled={participateDryRunRes?.error!==undefined} 
        className="px-14 m-auto py-2 mt-8 mx-4 bg-gray-600 border-1 border-gray-900 text-gray-100 font-bold rounded-lg"
      >Participate!</button>
    </div>

  </div>
  );
};

export default LottoParticipateAction;

/*

<ExportedImage className="inline mr-3" src={pinklogo_svg} alt="PINK" height={30} width={30} /> 

    <div className="w-60 m-auto cursor-pointer" onClick={() => {batchParticipate([
      [1,2,3,4],[1,2,3,5],[1,2,3,6],[1,2,3,7],[1,2,3,8],[1,2,3,9],[1,2,3,10],[1,2,3,11],[1,2,3,12],[1,2,3,13]
    ])}}>
      <button 
        className="px-4 py-2 mt-8 mx-4 bg-pink-300 border-1 border-pink-400 text-pink-700 font-bold rounded-lg inline-flex items-center"
      >  <ExportedImage className="inline mr-3" src={pinklogo_svg} alt="PINK" height={30} width={30} />  Batch  <ExportedImage className="inline ml-3" src={pinklogo_svg} alt="PINK" height={30} width={30} />  </button>
    </div>*/