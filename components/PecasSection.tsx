"use client";

import { motion } from "framer-motion";

type Peca = {
  nome: string;
  spec: string;
  desc: string;
};

const PECAS: Peca[] = [
  { nome: "CPU", spec: "Intel Core i9-14900K", desc: "Processamento extremo para zero gargalo" },
  { nome: "PLACA-MÃE", spec: "ASUS ROG MAXIMUS Z790", desc: "Plataforma flagship sem compromisso" },
  { nome: "COOLER", spec: "NZXT Kraken 360 RGB", desc: "Refrigeração líquida para performance total" },
  { nome: "RAM", spec: "64GB DDR5 6400MHz", desc: "Velocidade e capacidade além do padrão" },
  { nome: "GPU", spec: "RTX 4090 24GB GDDR6X", desc: "A GPU mais poderosa do mercado" },
  { nome: "FONTE + GABINETE", spec: "1000W Gold | Lian Li O11", desc: "Eficiência e visual que impõe respeito" },
];

export default function PecasSection() {
  return (
    <section className="relative w-full bg-black px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <h2
          className="mb-20 text-center font-display uppercase text-neonCyan"
          style={{
            fontSize: "clamp(40px, 7vw, 64px)",
            letterSpacing: "0.05em",
            textShadow: "0 0 24px rgba(0,255,255,0.5)",
          }}
        >
          AS PEÇAS
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PECAS.map((peca, index) => (
            <motion.article
              key={peca.nome}
              initial={{ x: index % 2 === 0 ? -80 : 80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6, boxShadow: "0 0 32px #9B30FF" }}
              className="group flex flex-col items-center rounded-sm p-8 transition-colors"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(0,255,255,0.2)",
              }}
            >
              <div
                className="mb-8 flex items-center justify-center"
                style={{
                  width: 200,
                  height: 200,
                  border: "1px solid #00FFFF",
                  boxShadow: "0 0 20px rgba(0,255,255,0.3)",
                }}
              >
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: "11px", color: "rgba(0,255,255,0.4)", letterSpacing: "0.2em" }}
                >
                  [ FOTO ]
                </span>
              </div>

              <h3
                className="mb-3 text-center font-display uppercase text-neonCyan"
                style={{ fontSize: "28px", letterSpacing: "0.03em" }}
              >
                {peca.nome}
              </h3>

              <p
                className="mb-3 text-center font-mono uppercase text-neonMagenta"
                style={{ fontSize: "13px", letterSpacing: "0.1em" }}
              >
                {peca.spec}
              </p>

              <p
                className="text-center"
                style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}
              >
                {peca.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
