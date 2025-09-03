"use client";

import { useEffect, useRef, useState } from "react";
import { generateMnemonic } from 'bip39';


export default function Home() {

  const [mnemonic, setMnemonic] = useState<string>("");
  const [mnemonicArray, setMnemonicArray] = useState<string[]>([]);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const aenimate = false;

  useEffect(() => {
    if (aenimate) {

    }
  }, [aenimate]);

  const createMnemonic = () => {
    if (!mnemonic) {
      const newMnemonic = generateMnemonic();
      setMnemonic(newMnemonic);
      setMnemonicArray(newMnemonic.split(" "));
    }
  };

  const createETHWallet = () => {
    
  }

  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <div className="flex justify-center items-center gap-2 text-4xl text-purple-700">
        <i className="fa-solid fa-wallet"></i>
        <h1>Wallet</h1>
      </div>
      <div>
        <p className="text-xl">Protecting What’s Yours, Always.</p>
      </div>
      {!mnemonic ? (
        <div onClick={createMnemonic} className="bg-purple-700 text-xl text-gray-300 px-6 py-3 rounded-xl cursor-pointer hover:scale-105 duration-200 mt-10">
        Generate Seed
      </div>
      ) : (
        <div onClick={createMnemonic} className="bg-purple-700 text-xl text-gray-300 px-6 py-3 rounded-xl cursor-pointer hover:scale-105 duration-200 mt-10">
        Create Wallet
      </div>
      )}
      {mnemonic && (
        <div>
          <p className="text-xl text-center font-semibold">Your Mnemonic</p>
          <div className="grid grid-cols-4 gap-4 rounded-xl shadow-xl shadow-gray-700/20 px-2 py-3">{mnemonicArray.map((e: string, i: number) => (
            <span key={i} className="bg-gray-300 px-2 py-1 rounded-lg text-center text-lg font-semibold">{e}<br /></span>
          ))}</div>
        </div>
      )}
    </div>
  );
}
