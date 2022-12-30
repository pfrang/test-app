import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [fileData, setFileData] = useState<undefined | File>(undefined)
  const [byteData, setByteData] = useState(undefined)

  const onClick = () => {
    const input = document.querySelector("input[type='file']") as HTMLInputElement
    input.click()
  }

  const onDelete = () => {
    const input = document.querySelector("input[type='file']") as HTMLInputElement
    input.files = new DataTransfer().files
    setFileData(undefined)
  }

  const onChange = (e) => {
    setFileData(e.target.files[0])
    const reader = new FileReader()
    reader.onload = function() {
      const arrBuffer = this.result;
      setByteData(arrBuffer);
    }
    const h = reader.readAsArrayBuffer(e.target.files[0])
    console.log("--",h);

  }
  // byteData && console.log(byteData);


  const isSizeOver10Mb = fileData && fileData.size > 10000000




  return (
    <div>
      <input accept='image/png, image/jpg, application/pdf' type="file" onChange={onChange} hidden={true} />
      <button onClick={onClick}>Click</button>
      {fileData && (
        <>
          {isSizeOver10Mb
            ?
            <span>TYoo big file</span> :
            <>

              <span>{fileData.name}</span>
              <button onClick={onDelete}>Delete</button>
            </>
          }
        </>
      )}
    </div>
  )
}
