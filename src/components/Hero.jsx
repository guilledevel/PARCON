import ButtonCotizar from "./ButtonCotizar";
import logo from "../assets/logo.webp";

export default function Hero() {
  return (
    <section className=" text-center p-10 md:mb-20">
      <img
        src={logo.src}
        alt="Parcon Logo"
        className="inline-block w-sm  ml-2"
      />
      <h2 className="text-4xl font-bold">
        ¡Impulsa tu marca con
        <span className="text-(--complement) uppercase font-bold">
          parcon
        </span>{" "}
      </h2>
      <p className="mt-4 text-lg">
        Publicidad digital e impresión con alto impacto{" "}
        <span className="text-(--secundary)">visual</span>
      </p>

      <ButtonCotizar />
    </section>
  );
}
