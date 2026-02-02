type HeroId = `${string}-${string}-${string}-${string}-${string}`;
type Hero = {
  readonly id?: HeroId;
  name: string;
  age: number;
  isActive?: boolean;
};

let hero: Hero = {
  name: "thor",
  age: 1500,
};

function createHero(hero: Hero): Hero {
  const { name, age } = hero;
  return { id: crypto.randomUUID(), name, age, isActive: true };
}

const thor = Object.freeze(createHero({ name: "thor", age: 150 }));
//thor.id = crypto.randomUUID();
//console.log(thor);

function createAddres() {
  return {
    planet: "tierra",
    city: "Shinahota",
  };
}

type Address = ReturnType<typeof createAddres>;

//Arrays

const languages: string[] = [];
languages.push("js");
console.log(languages);
