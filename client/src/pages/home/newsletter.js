const Newsletter = () => {
  return (
    <section className='my-3 mx-1 sm:mx-5 text-center'>
      <main className='container border border-black/80 py-10 px-5'>
        <h2 className='bellefair font-bold text-lg sm:text-xl leading-10 mb-8'>
          NEWSLETTER
        </h2>
        <p className='mb-8 leading-9 sm:text-base'>
          Subscribe to get daily updates on new drops & exciting deals
        </p>
        <form
          className='flex gap-8 justify-start flex-col items-start sm:flex-row sm:justify-center sm:items-center'
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type='email'
            placeholder='ENTER YOUR EMAIL'
            className='py-4 px-6 w-full sm:w-2/5 border border-transparent border-b border-b-black focus:border-black'
          />
          <button className='bg-black text-white px-4 py-5'>SUBSCRIBE</button>
        </form>
      </main>
    </section>
  );
};

export default Newsletter;
