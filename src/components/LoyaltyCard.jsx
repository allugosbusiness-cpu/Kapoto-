import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Award, TrendingUp, Gift, Star, ShoppingBag } from "lucide-react";
import { useLoyalty } from "../LoyaltyContext";

export default function LoyaltyCard({ isOpen, setIsOpen }) {
  const { points, totalOrders, totalEarned, rewards, getNextReward, lastOrderAmount } = useLoyalty();

  const nextReward = getNextReward();
  const progressToNext = nextReward ? (totalOrders / nextReward.orders) * 100 : 100;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[110]" onClose={() => setIsOpen(false)}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
            <Dialog.Panel className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-all">
                <X className="w-5 h-5 text-gray-400" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🏆</span>
                </div>
                <Dialog.Title className="text-xl font-bold text-gray-900">Kapoto Loyalty Club</Dialog.Title>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-amber-700">{totalOrders}</div>
                  <div className="text-xs text-amber-600/70">Orders Made</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-amber-700">{points}</div>
                  <div className="text-xs text-amber-600/70">Points Earned</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-amber-700">{totalEarned > 0 ? `${totalOrders}/50` : "0/10"}</div>
                  <div className="text-xs text-amber-600/70">Reward Progress</div>
                </div>
              </div>

              {/* How points work */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-700 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  Earn <strong>5 points</strong> per order over <strong>$10</strong>
                </p>
              </div>

              {/* Progress to next reward */}
              {nextReward ? (
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span className="font-medium">Next reward at {nextReward.orders} orders</span>
                    <span className="font-medium">{totalOrders}/{nextReward.orders} orders</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(progressToNext, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{nextReward.icon} {nextReward.reward} - {nextReward.description}</p>
                </div>
              ) : (
                <div className="mb-6 text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <p className="text-sm font-bold text-amber-700">All rewards unlocked! You're a VIP!</p>
                </div>
              )}

              {/* Rewards - Show all */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-600" /> Rewards Milestones
                </h4>
                <div className="space-y-2">
                  {rewards.map((d, i) => {
                    const unlocked = totalOrders >= d.orders;
                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-between border rounded-lg px-4 py-2.5 transition-all ${
                          unlocked
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-100 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{d.icon}</span>
                          <div>
                            <span className={`text-sm font-bold ${unlocked ? "text-green-700" : "text-gray-600"}`}>
                              {d.reward}
                            </span>
                            <p className="text-xs text-gray-400">{d.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-500">{d.orders} orders</span>
                          {unlocked && <span className="text-green-500 text-sm">✓</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                  <ShoppingBag className="w-3 h-3 text-amber-400" /> Rewards start after <strong className="text-amber-700">10 orders</strong>
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}