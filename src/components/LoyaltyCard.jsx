import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Star, Award, TrendingUp, Gift } from "lucide-react";
import { useLoyalty } from "../LoyaltyContext";

export default function LoyaltyCard({ isOpen, setIsOpen }) {
  const { points, totalEarned, totalOrders, level, levelInfo, nextLevelAt, getPointsProgress } = useLoyalty();
  const progress = getPointsProgress();

  const discounts = [
    { orders: 5, points: 25, discount: "$2 off" },
    { orders: 10, points: 50, discount: "$5 off" },
    { orders: 20, points: 100, discount: "$12 off" },
    { orders: 50, points: 250, discount: "Free meal" },
  ];

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[110]" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative w-full max-w-md bg-gradient-to-b from-amber-900 to-amber-950 border border-amber-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
              </div>

              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-1 hover:bg-amber-800/50 rounded-full transition-all z-10">
                <X className="w-5 h-5 text-amber-400" />
              </button>

              {/* Header */}
              <div className="relative text-center mb-6">
                <div className="text-5xl mb-2">{levelInfo.icon}</div>
                <Dialog.Title className="text-2xl font-bold text-amber-300">
                  Kapoto Loyalty Club
                </Dialog.Title>
              </div>

              {/* Level Badge */}
              <div className="relative text-center mb-6">
                <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r ${levelInfo.color} shadow-lg`}>
                  <Award className="w-5 h-5 text-white" />
                  <span className="font-bold text-white">{level} Member</span>
                </div>
              </div>

              {/* Points Display */}
              <div className="relative grid grid-cols-3 gap-3 mb-6">
                <div className="bg-amber-900/50 border border-amber-700/30 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-amber-300">{points}</div>
                  <div className="text-xs text-amber-400/70">Points</div>
                </div>
                <div className="bg-amber-900/50 border border-amber-700/30 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-amber-300">{totalOrders}</div>
                  <div className="text-xs text-amber-400/70">Orders</div>
                </div>
                <div className="bg-amber-900/50 border border-amber-700/30 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-amber-300">{levelInfo.discount}%</div>
                  <div className="text-xs text-amber-400/70">Discount</div>
                </div>
              </div>

              {/* Progress Bar */}
              {nextLevelAt && (
                <div className="relative mb-6">
                  <div className="flex justify-between text-xs text-amber-400/70 mb-1">
                    <span>{level}</span>
                    <span>{nextLevelAt} pts</span>
                  </div>
                  <div className="h-2 bg-amber-800/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Rewards */}
              <div className="relative">
                <h4 className="text-sm font-semibold text-amber-300 mb-3 flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  Rewards & Milestones
                </h4>
                <div className="space-y-2">
                  {discounts.map((d, i) => (
                    <div key={i} className="flex items-center justify-between bg-amber-900/30 border border-amber-700/30 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-xs text-amber-100/70">{d.orders} orders</span>
                      </div>
                      <span className="text-xs font-bold text-amber-300">{d.discount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How it works */}
              <div className="relative mt-4 pt-4 border-t border-amber-700/30">
                <p className="text-xs text-amber-400/60 text-center">
                  ⭐ Earn <strong>5 points</strong> for every order placed via WhatsApp
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}