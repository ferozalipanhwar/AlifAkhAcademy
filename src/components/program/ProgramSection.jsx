
const programs = [
  {
    title: "Pre-college education",
    description: "Broaden the creative horizons of your kids",
    image: "https://source.unsplash.com/400x300/?students,learning",
  },
  {
    title: "Middle school",
    description: "Broaden the creative horizons of your kids",
    image: "https://source.unsplash.com/400x300/?school,education",
  },
  {
    title: "High school",
    description: "Preparing youngsters for the adult life",
    image: "https://source.unsplash.com/400x300/?highschool,classroom",
  },
  {
    title: "International exchange",
    description: "Accepting students from abroad",
    image: "https://source.unsplash.com/400x300/?international,students",
  },
  {
    title: "Graduate programs",
    description:
      "Solidifying knowledge that was obtained through the long years of learning",
    image: "https://source.unsplash.com/400x300/?graduation,university",
  },
  {
    title: "Home education",
    description: "Providing robust distant education",
    image: "https://source.unsplash.com/400x300/?online,education",
  },
];

const ProgramSection = () => {
  return (
    <section id="Programs" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Programs</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-green-600 bg-opacity-70 flex flex-col justify-center items-center text-white p-4 transition duration-300 group-hover:bg-opacity-80">
                <h3 className="text-xl font-semibold mb-2">
                  {program.title}
                </h3>
                <p className="text-sm max-w-xs">{program.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
