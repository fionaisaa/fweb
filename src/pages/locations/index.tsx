"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import PrishtinaImage from "@/assets/images/l1.jpg";
import PejaImage from "@/assets/images/l3.jpg";
import GjakovaImage from "@/assets/images/l4.jpg";
import PrizrenImage from "@/assets/images/l5.jpg";
import FerizajImage from "@/assets/images/l2.jpg";
import GjilanImage from "@/assets/images/l6.jpg";

const locations = [
  {
    city: "Prishtinë",
    address: "Rr. UÇK, nr. 25",
    phone: "+383 49 123 456",
    image: PrishtinaImage,
  },
  {
    city: "Pejë",
    address: "Rr. Mbretëresha Teutë, nr. 12",
    phone: "+383 49 654 321",
    image: PejaImage,
  },
  {
    city: "Gjakovë",
    address: "Rr. Nëna Terezë, nr. 8",
    phone: "+383 49 789 123",
    image: GjakovaImage,
  },
  {
    city: "Prizren",
    address: "Rr. Sheshi i Lidhjes, nr. 10",
    phone: "+383 49 456 789",
    image: PrizrenImage,
  },
  {
    city: "Ferizaj",
    address: "Rr. Driton Islami, nr. 3",
    phone: "+383 49 111 222",
    image: FerizajImage,
  },
  {
    city: "Gjilan",
    address: "Rr. Hamdi Kurteshi, nr. 14",
    phone: "+383 49 333 444",
    image: GjilanImage,
  },
];

export default function RestaurantLocations() {
  return (
    <div className="pt-14 bg-[#fefcf9] min-h-screen">
      <motion.section
        className="w-full py-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold mb-6 text-[#7B3F00]">Lokacionet Tona</h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-700">
        Nga Prishtina në Prizren  njësoj e shijshme kudo . Gjej lokacionin më të afërt dhe na vizito për një përvojë unike kulinare.
        </p>
      </motion.section>

      <motion.section
        className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {locations.map((location, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden transition hover:scale-105 hover:shadow-lg duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={location.image}
              alt={location.city}
              width={400}
              height={250}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-left">
              <h2 className="text-2xl font-semibold text-[#D2691E] mb-2">{location.city}</h2>
              <p className="text-gray-700 mb-1">📍 {location.address}</p>
              <p className="text-gray-600">📞 {location.phone}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}

RestaurantLocations.displayName = "restaurantLocations";
