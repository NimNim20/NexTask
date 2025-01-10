import GoToButton from "./Buttons/GotoButton";

function WelcomeCard() {
  return (
    <section className="WelcomeSection">
      <div className="WelcomeCard flex flex-wrap flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full p-5">
        <h1 className="text-6xl text-slate-800 underline">Welcome to NexTask</h1>
        <p className="text-slate-800 text-large pt-2">Start tracking your projects with ease, right here!</p>
        <div className="flex flex-wrap justify-center mt-9">
          <GoToButton />
        </div>
      </div>
    </section>
  )
}

export default WelcomeCard;