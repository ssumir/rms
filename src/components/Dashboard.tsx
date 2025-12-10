
import { FaHome, FaBaby, FaFileAlt, FaPlus, FaArrowLeft, FaCalculator } from "react-icons/fa";

interface Props {
  setCurrentPage: (page: string) => void;
}

// export default function Dashboard({ setCurrentPage }: Props) {
//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Reward Management Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <button
//           className="p-5 bg-blue-200 shadow rounded"
//           onClick={() => setCurrentPage("maternity")}
//         >
//           ➤ Service Age Calculator
//         </button>

//         <button
//           className="p-5 bg-green-200 shadow rounded"
//           onClick={() => setCurrentPage("settlement")}
//         >
//           ➤ Final Settlement Form
//         </button>
//       </div>
//     </div>
//   );
// }

  // Dashboard Component
export default function Dashboard({ setCurrentPage }: Props) {
    const cards = [
      {
        id: 'maternity',
        title: 'Maternity Benefit',
        titleBn: 'মাতৃত্বকালীন সুবিধা',
        icon: FaBaby,
        color: 'from-pink-500 to-rose-500',
        description: 'Calculate maternity leave and benefits based on service duration',
        descriptionBn: 'সেবা সময়কালের ভিত্তিতে মাতৃত্বকালীন ছুটি এবং সুবিধা গণনা করুন',
      },
      {
        id: 'settlement',
        title: 'Final Settlement',
        titleBn: 'চূড়ান্ত নিষ্পত্তি',
        icon: FaFileAlt,
        color: 'from-blue-500 to-cyan-500',
        description: 'Process employee final settlement and dues calculation',
        descriptionBn: 'কর্মচারী চূড়ান্ত নিষ্পত্তি এবং বকেয়া গণনা প্রক্রিয়া',
      },
      {
        id: 'extra',
        title: 'Extra Services',
        titleBn: 'অতিরিক্ত সেবা',
        icon: FaPlus,
        color: 'from-purple-500 to-indigo-500',
        description: 'Additional employee benefits and services',
        descriptionBn: 'অতিরিক্ত কর্মচারী সুবিধা এবং সেবা',
      },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Welcome to Reward Dashboard</h2>
            <p className="text-lg text-gray-600">রিওয়ার্ডস ড্যাশবোর্ডে স্বাগতম - Select a service to continue</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setCurrentPage(card.id)}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden">
                    <div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
                      <div className="flex justify-center mb-4">
                        <div className="bg-white bg-opacity-20 p-4 rounded-full">
                          <Icon className="w-12 h-12" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-center mb-1">{card.title}</h3>
                      <p className="text-center text-sm opacity-90">{card.titleBn}</p>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-2">{card.description}</p>
                      <p className="text-gray-600 text-sm">{card.descriptionBn}</p>
                      <div className="mt-4 text-center">
                        <span className="text-blue-600 font-semibold group-hover:underline">Open Module →</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };