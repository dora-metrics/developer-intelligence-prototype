'use client'
import { useState, useEffect } from "react"

export async function getApps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PELORUS_API_URL}/sdp/apps?range=1w`)
  if (!response.ok) {
    throw new Error('Failed to fetch list of Apps from Pelorus')
  }
  return response.json()
}

export function getLTFC(appName) {

  // const [response, setResponse] = useState('')
  // useEffect(() => {
  // fetch(`${process.env.NEXT_PUBLIC_PELORUS_API_URL}/sdp/lead_time_for_change/${appName}?range=1w`).then((test) => test.json()).then((data) => {setResponse(data)}).catch((error) => { console.log(error) })
  // }, []);
  // return response
  const response = fetch(`${process.env.NEXT_PUBLIC_PELORUS_API_URL}/sdp/lead_time_for_change/${appName}?range=1w`).then((test) => test.json()).catch((error) => { console.log(error) })
  return response
}

export function getDF(appName) {

  // const [response, setResponse] = useState('')
  // useEffect(() => {
  // fetch(`${process.env.NEXT_PUBLIC_PELORUS_API_URL}/sdp/deployment_frequency/${appName}?range=1w`).then((test) => test.json()).then((data) => {setResponse(data)}).catch((error) => { console.log(error) })
  // }, []);
  // return response
  const response = fetch(`${process.env.NEXT_PUBLIC_PELORUS_API_URL}/sdp/deployment_frequency/${appName}?range=1w`).then((test) => test.json()).catch((error) => { console.log(error) })
  return response
}

export function getMTTR(appName) {
  // const [response, setResponse] = useState('')
  // useEffect(() => {
  // fetch(`${process.env.NEXT_PUBLIC_PELORUS_API_URL}/sdp/mean_time_to_restore/${appName}?range=1w`).then((test) => test.json()).then((data) => {setResponse(data)}).catch((error) => { console.log(error) })
  // }, []);
  const response = fetch(`${process.env.NEXT_PUBLIC_PELORUS_API_URL}/sdp/mean_time_to_restore/${appName}?range=1w`).then((test) => test.json()).catch((error) => { console.log(error) })
  return response
}

export function getCFR(appName) {
  // const [response, setResponse] = useState('')
  // useEffect(() => {
  // fetch(`${process.env.NEXT_PUBLIC_PELORUS_API_URL}/sdp/change_failure_rate/${appName}?range=1w`).then((test) => test.json()).then((data) => {setResponse(data)}).catch((error) => { console.log(error) })
  // }, []);

  const response = fetch(`${process.env.NEXT_PUBLIC_PELORUS_API_URL}/sdp/change_failure_rate/${appName}?range=1w`).then((test) => test.json()).catch((error) => { console.log(error) })
  return response
}

export function getDORA(appName) {

  const dora = {mttr: 0, cfr: 0, df: 0, ltfc: 0}
  const cfr = getCFR(appName)
  dora.cfr = cfr.cfr
  const df = getDF(appName)
  dora.df = df.df
  const mttr = getMTTR(appName)
  dora.mttr = mttr.mttr
  const ltfc = getLTFC(appName)
  dora.ltfc = ltfc.ltfc
  return dora
}