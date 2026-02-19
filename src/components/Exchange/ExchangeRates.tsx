"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';


export default function ExchangeRates() {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [names, setNames] = useState<Record<string, string> | null>(null);

  const [keyFrom, setKeyFrom] = useState<string>("USD")
  const [urlFrom, setUrlFrom] = useState<string>("https://www.xe.com/svgs/flags/usd.static.svg")
  const [nameFrom, setNameFrom] = useState<string>("- United States Dollar")
  const [isShowFrom, setIsShowForm] = useState<boolean>(false)
  const [valueFrom, setValueFrom] = useState<number>(0)

  const [keyTo, setKeyTo] = useState<string>("EUR")
  const [urlTo, setUrlTo] = useState<string>("https://www.xe.com/svgs/flags/eur.static.svg")
  const [nameTo, setNameTo] = useState<string>("- EURO")
  const [isShowTo, setIsShowTo] = useState<boolean>(false)
  const [valueTo, setValueTo] = useState<number>(0)

  const [amount, setAmount] = useState<number>(1)
  const [isShowCalculate, setIsShowCalculate] = useState<boolean>(false)



  useEffect(() => {
    getRates()
    getNames()
  }, [])

  const getRates = async (): Promise<void> => {
    try {
      const response: Response = await fetch("https://open.er-api.com/v6/latest/USD");
      const data: any = await response.json();
      setRates(data.rates);
    } catch (error) {
      console.log(error);
    }
  }
  const getNames = async (): Promise<void> => {
    try {
      const response: Response = await fetch("https://openexchangerates.org/api/currencies.json");
      const data: any = await response.json();
      setNames(data);
    } catch (error) {
      console.log(error);
    }
  }

  const ClickPanelFrom = (key: string, name: string, value: number, url: string): void => {
    setKeyFrom(key)
    setNameFrom(`- ${name}`)
    setUrlFrom(url)
    setIsShowForm(false)
    setValueFrom(value)
  }

  const ClickPanelTo = (key: string, name: string, value: number, url: string): void => {
    setKeyTo(key)
    setNameTo(`- ${name}`)
    setUrlTo(url)
    setIsShowTo(false)
    setValueTo(value)
  }

  const togglePanelFrom = (): void => {
    setIsShowForm(!isShowFrom)
    setIsShowTo(false)
  }

  const togglePanelTo = (): void => {
    setIsShowTo(!isShowTo)
    setIsShowForm(false)
  }
  const resetPanels = (): void => {
    setIsShowTo(false)
    setIsShowForm(false)
  }
  const calculate = () => {
    if (valueFrom === 0) {
      setValueFrom(rates!["USD"])

    }
    if (valueTo === 0) {
      setValueTo(rates!["EUR"])
    }
    setIsShowForm(false)
    setIsShowTo(false)
    setIsShowCalculate(true)
  }


  return (
    <Box className="flex justify-center min-h-screen max-h-full bg-gradient-to-r from-[rgb(20,20,105)] to-[rgb(15,15,65)] w-full h-[1000px]">
      <Box className='flex flex-col items-center mt-48 px-4 w-full'>

        {!rates || !names ? (
          <CircularProgress className='text-white' />
        ) : (

          <Box className="flex flex-col items-center py-10 px-5 rounded-3xl bg-white w-full md:w-5/6 lg:w-4/5">

            <TextField
              onClick={resetPanels}
              onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                setAmount(Number(e.target.value));
              }}
              value={amount}
              className='my-4 w-full md:w-2/3 lg:w-1/2'
              label="Amount"
              type="text"
              lang="en"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  inputProps: {
                    inputMode: "decimal",
                    pattern: "[0-9]*[.,]?[0-9]*",
                  },
                },
              }}
            />

            <Box className="w-full flex justify-center relative">
              <TextField
                className='my-4 w-full md:w-2/3 lg:w-1/2 '
                onClick={togglePanelFrom}
                label="From"
                slotProps={{
                  input: {
                    startAdornment:
                      <Box className='flex items-center py-6 px-4'>
                        <Avatar src={urlFrom} />
                        <Typography variant="body1" color="initial" className='px-2'>{keyFrom}</Typography>
                        <Typography variant="body1" color="initial" className='text-gray-400 whitespace-nowrap'>{nameFrom}</Typography>
                      </Box>,
                  },
                }}
              />
              <Box className={` absolute h-[300px] w-full md:w-2/3 lg:w-1/2 bg-gray-100 top-[105%] rounded-md overflow-y-scroll z-30 ${isShowFrom ? "flex" : "hidden"}`}>
                <ul className='w-full'>
                  {Object.entries(rates).map(([key, value]) => ((names[key] && key !== "SSP") &&
                    <li key={key} className='flex w-full gap-5 text-sm border-blue-400 px-2 py-3 rounded-md cursor-pointer hover:border hover:bg-yellow-400' onClick={() => ClickPanelFrom(key, names[key], value, `https://www.xe.com/svgs/flags/${key.toLowerCase()}.static.svg`)}>
                      <img className='size-6' src={`	https://www.xe.com/svgs/flags/${key.toLowerCase()}.static.svg`} alt="" />
                      <Typography variant="body1" className='text-sm '>{` ${key}   ${names[key]} `}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>

            <Box className="w-full flex justify-center relative">
              <TextField
                className=' my-4 w-full md:w-2/3 lg:w-1/2'
                onClick={togglePanelTo}
                label="To"
                slotProps={{
                  input: {
                    startAdornment:
                      <Box className='flex items-center py-6 px-4'>
                        <Avatar src={urlTo} />
                        <Typography variant="body1" color="initial" className='px-2'>{keyTo}</Typography>
                        <Typography variant="body1" color="initial" className='text-gray-400 whitespace-nowrap'>{nameTo}</Typography>
                      </Box>,
                  },
                }}
              />
              <Box className={` absolute h-[300px] w-full md:w-2/3 lg:w-1/2 bg-gray-100 top-[105%] rounded-md overflow-y-scroll z-30 ${isShowTo ? "flex" : "hidden"}`}>
                <ul className='w-full'>
                  {Object.entries(rates).map(([key, value]) => ((names[key] && key !== "SSP") &&
                    <li key={key} className='flex w-full gap-5 text-sm border-blue-400 px-2 py-3 rounded-md cursor-pointer hover:border hover:bg-yellow-400' onClick={() => ClickPanelTo(key, names[key], value, `https://www.xe.com/svgs/flags/${key.toLowerCase()}.static.svg`)}>
                      <img className='size-6' src={`	https://www.xe.com/svgs/flags/${key.toLowerCase()}.static.svg`} alt="" />
                      <Typography variant="body1" className='text-sm '>{` ${key}   ${names[key]} `}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>

            <Box className="w-full flex flex-wrap  px-4">
              <Box className="w-full flex flex-col items-center px-3 py-2 md:w-1/2 md:items-start">
                {isShowCalculate &&
                  <>
                    <Box className="text-xl text-[rgb(92,102,123)]">{amount.toFixed(2)} {keyFrom} =</Box>
                    <Box className="text-[rgb(46, 60, 87)] text-3xl my-2">{(Number(amount.toFixed(2)) * valueTo / valueFrom).toFixed(6)} {keyTo}</Box>
                  </>
                }
              </Box>
              <Box className='w-full flex justify-center bg-blue-450 py-4 md:w-1/2 md:justify-end'>
                <Button variant="contained" className='w-3/5 md:w-2/3 lg:w-1/2 xl:w-2/5 py-4' onClick={calculate}>Convert</Button>
              </Box>
            </Box>
          </Box>
        )}


      </Box>
    </Box>
  )
}

