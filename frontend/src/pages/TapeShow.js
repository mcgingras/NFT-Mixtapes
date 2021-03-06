import React, {useState, useEffect} from 'react';
import { useParams, Link } from "react-router-dom";
import CassetteModel from '../components/CassetteModel';
import TextureCassette from '../components/three/Tester-dimension-casette';

import useSpotify from '../hooks/useSpotify';

const demoStats = {
  "Duration": "60 Min",
  "Shader": "Holo",
  "Rarity": "96.9",
  "Edition": "1",
  "Aisle": "6",
  "Bay": "12",
  "Core": "Bright",
  "Quality": "Bitty"
}
const Stat = ({k, v}) => {
  return (
    <div class="flex justify-between items-center">
      <span className="mr-2 text-xs">{k}</span>
      <span className="w-1/2 bg-gray-900 text-xs text-blue-500 p-1">{v}</span>
    </div>
  )
}
const TapeShow = () => {
  const [tape, setTape] = useState(undefined);

  const [loggedIn, token] = useSpotify();

  // spotify login
  let { id } = useParams();

  const fetchTapes = (id) => {
    return fetch(`http://localhost:1234/tape/${id}`, {
      method: 'GET'
    })
    .then(res => res.json())
  }

  useEffect(() => {
    fetchTapes(id)
    .then(results => {
      setTape(results);
    })
  }, [id])


  return (
    <div className="min-h-screen h-screen relative">
      {
        tape != undefined &&
        <CassetteModel />
      }
      <h1 className="fixed top-0 text-4xl p-8">Classic Tape</h1>
      <div className="fixed p-8 bg-blue-400 bottom-0 m-8">
        <div className="grid grid-cols-4">
          <div className="flex flex-col text-sm pr-8 border-r border-black">
            <p className="font-bold">You currently own this tape.</p>
            <p>Tape #244</p>
          </div>
          <div className="flex flex-col border-r border-black px-8">
            <p className="font-bold mb-2 text-sm">Tape Stats</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(demoStats).map(([key, value]) => {
                  return (
                    <Stat k={key} v={value} />
                  )
                })}
            </div>
          </div>
          <div className="flex flex-col justify-between px-8 border-r border-black">
            { loggedIn
            ?
            <>
              <p className="text-sm text-center">Edit this cassette.</p>
              <button className="bg-gray-900 px-4 py-2 text-blue-500 font-bold text-sm rounded-full"><Link to={`/tapes/${id}/edit`}>Edit Cassette</Link></button>
            </>
            :
            <>
              <p className="text-sm text-center">You need a Spotify Premium account to interact with this cassette. Please connect your account.</p>
              <button className="bg-gray-900 px-4 py-2 text-blue-500 font-bold text-sm rounded-full"><a href={`http://localhost:8888/login?redirect=/tapes/${id}`}>Log into Spotify</a></button>
            </>
            }

          </div>
          <div className="flex flex-col justify-between pl-8">
            <span className="uppercase text-center text-xs">Last sold for</span>
            <span className="text-4xl text-center font-bold">4.0 ETH</span>
            <button className="bg-gray-900 px-4 py-2 text-blue-500 font-bold text-sm rounded-full">List for Sale</button>
          </div>
        </div>
      </div>
      {/* <Demo /> */}
    </div>
  )
}

export default TapeShow;