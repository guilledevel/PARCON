import ButtonCotizar from "./ButtonCotizar";
import logo from "../assets/logo.webp";
import Marquee from "./Marquee.tsx";

export default function Hero() {
  return (
    <section className="w-full text-center p-10  text-white ">
      <img src={logo.src} alt="Parcon Logo" class="inline-block w-sm  ml-2" />
      <h2 className="text-4xl font-bold">¡Impulsa tu marca con <span class="text-(--complement) uppercase font-bold">parcon</span> </h2>
      <p className="mt-4 text-lg">Publicidad digital e impresión con alto impacto <span class="text-(--secundary)">visual</span></p>

      <ButtonCotizar/>

      <Marquee/>
      <p>hola marquee</p>
    </section>
  );
}
