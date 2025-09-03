"use client";

import { useEffect, useRef, useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

type WalletData = {
  address: string;
  privateKey: string;
};

export default function Home() {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [mnemonicArray, setMnemonicArray] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [visible, setVisible] = useState<{ [key: number]: boolean }>({}); // track visibility per wallet
  const iconRef = useRef<HTMLDivElement | null>(null);
  const aenimate = false;

  useEffect(() => {
    //for gsap animation
  }, [aenimate]);

  const createMnemonic = () => {
    if (!mnemonic) {
      const newMnemonic = generateMnemonic();
      setMnemonic(newMnemonic);
      setMnemonicArray(newMnemonic.split(" "));
    }
  };

  const createETHWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/0'/0/${currentIndex}`; // ✅ corrected path
    const hdnode = HDNodeWallet.fromSeed(seed);
    const child = hdnode.derivePath(derivationPath);

    const wallet = new Wallet(child.privateKey);

    const newWallet: WalletData = {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };

    setCurrentIndex(currentIndex + 1);
    setWallets([...wallets, newWallet]);
  };

  if (!mnemonic) {
    return (
      <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
        <div className="flex justify-center items-center gap-2 text-4xl text-purple-700">
          <i className="fa-solid fa-wallet"></i>
          <h1>Wallet</h1>
        </div>
        <div>
          <p className="text-xl">Protecting What’s Yours, Always.</p>
        </div>
        <div
          onClick={createMnemonic}
          className="bg-purple-700 text-xl text-gray-300 px-6 py-3 rounded-xl cursor-pointer hover:scale-105 duration-200 mt-10"
        >
          Generate Seed
        </div>
      </div>

    )
  }

  return (
    <div className="w-full h-screen grid grid-cols-2 gap-4 justify-center items-center">
      <div className="max-h-screen flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-2 text-4xl text-purple-700">
          <i className="fa-solid fa-wallet"></i>
          <h1>Wallet</h1>
        </div>
        <div>
          <p className="text-xl">Protecting What’s Yours, Always.</p>
        </div>
        {!mnemonic ? (
          <div
            onClick={createMnemonic}
            className="bg-purple-700 text-xl text-gray-300 px-6 py-3 rounded-xl cursor-pointer hover:scale-105 duration-200 mt-2"
          >
            Generate Seed
          </div>
        ) : (
          <div
            onClick={createETHWallet}
            className="bg-purple-700 text-xl w-52 text-center text-gray-300 px-6 py-3 rounded-xl cursor-pointer hover:scale-105 duration-200 mt-2"
          >
            Create Wallet
          </div>
        )}
        {mnemonic && (
          <div>
            <p className="text-xl text-center font-semibold">Your Mnemonic</p>
            <div className="grid grid-cols-4 gap-4 rounded-xl border border-gray-300 shadow-xl shadow-gray-700/20 px-2 py-3">
              {mnemonicArray.map((e: string, i: number) => (
                <span
                  key={i}
                  className="bg-gray-300 px-2 py-1 rounded-lg text-center text-lg font-semibold"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="max-h-screen overflow-auto">
        {wallets.length == 0 ? (<p className="text-center text-xl text-gray-400">Create Your First ETH Wallet</p>) : (<p className="text-xl text-gray-400">Your ETH Wallets</p>)}
        {wallets.length > 0 && (
          <div className="mt-6 w-full max-w-2xl space-y-6">
            {wallets.map((wallet, i) => (
              <div
                key={i}
                className="p-4 rounded-xl shadow-md bg-white border border-gray-300"
              >
                <p className="text-xl text-center font-semibold mb-2">
                  Wallet {i + 1}
                </p>

                <div className="mb-2">
                  <p className="font-semibold">Address:</p>
                  <p className="bg-gray-200 px-2 py-1 rounded-lg break-words">
                    {wallet.address}
                  </p>
                </div>

                <div>
                  <label htmlFor="privateKey"><p className="font-semibold">Private Key:</p></label>
                  <input
                    id="privateKey"
                    type={visible[i] ? "text" : "password"}
                    readOnly
                    value={wallet.privateKey}
                    className="w-full bg-gray-200 px-2 py-1 rounded-lg font-mono"
                  />
                </div>

                <button
                  onClick={() =>
                    setVisible((prev) => ({ ...prev, [i]: !prev[i] }))
                  }
                  className="mt-2 text-sm text-purple-700 cursor-pointer"
                >
                  {visible[i] ? "Hide Keys" : "Show Keys"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
