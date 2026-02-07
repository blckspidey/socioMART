import { motion } from "framer-motion";
import PageContainer from "../layout/PageContainer";
import { Store, ShoppingBag, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Store,
    title: "Create Your Business",
    description:
      "Set up your business profile in minutes and showcase what you offer.",
  },
  {
    icon: ShoppingBag,
    title: "Add Products & Services",
    description:
      "List products or services with images, pricing, and availability.",
  },
  {
    icon: Sparkles,
    title: "Get Discovered & Sell",
    description:
      "Customers discover you socially, follow your business, and buy or book.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative">
      {/* Subtle divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-px
                   bg-gradient-to-r from-transparent via-gray-300 to-transparent"
        aria-hidden="true"
      />

      <PageContainer className="py-20">
        {/* Section Heading */}
        <div className="max-w-xl mx-auto mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            How SocioMart Works
          </h2>
          <p className="mt-4 text-gray-600">
            A simple flow designed for local businesses and social discovery.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="flex flex-col items-center text-center gap-4"
              >
                {/* Icon with hover micro-interaction */}
                <motion.div
                  whileHover={{ y: -2, rotate: -2 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                >
                  <Icon className="w-6 h-6 text-primary" />
                </motion.div>

                {/* Text */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
