const CheckoutForm = ({ user, form, setForm }) => {
  return (
    <form className='basis-full sm:basis-1/2 text-gray-500'>
      <h2 className='text-base sm:text-lg text-black mb-4'>Billing details</h2>
      <div className='email'>
        <label htmlFor='email'>Your email</label>
        <input
          type='text'
          placeholder={user.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          value={form.email}
        />
        <div className='update'>
          <input
            onChange={(e) =>
              setForm({
                ...form,
                subscribe: e.target.checked,
              })
            }
            value={form.subscribe}
            type='checkbox'
          />
          <span>Get updates about new products & exclusive offers</span>
        </div>
      </div>
      <div className='name'>
        <label htmlFor='name'>Your name</label>
        <input
          type='text'
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form.name}
          placeholder={user.name}
        />
      </div>

      <div>
        <label htmlFor='Apartment'>Apartment</label>
        <input
          type='text'
          placeholder='Apartment, suite, unit, etc. (Optional)'
          value={form.apartment}
          onChange={(e) => setForm({ ...form, apartment: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor='Address'>
          Street Address <span className='text-red-500 font-bold'>*</span>
        </label>
        <input
          type='text'
          placeholder='Street address*'
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor='city'>
          Town / City <span className='text-red-500 font-bold'>*</span>
        </label>
        <input
          type='text'
          placeholder='Town / City*'
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
      </div>
      <div className='location'>
        <div className='country'>
          <label htmlFor='country'>
            Country <span className='text-red-500 font-bold'>*</span>
          </label>
          <input
            type='text'
            placeholder='Country*'
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='phone'>Phone number</label>
          <input
            type='number'
            placeholder='Phone number*'
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
      </div>

      <div className='phone'>
        <label htmlFor='postal-code'>Postal code</label>
        <input
          type='number'
          placeholder='Postal code (Optional)'
          value={form.postal}
          onChange={(e) => setForm({ ...form, postal: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor='Notes'>Order notes</label>
        <textarea
          placeholder='Order notes (Optional)'
          className='w-full placeholder:p-4 resize-y border border-black'
          rows='10'
        ></textarea>
      </div>
    </form>
  );
};

export default CheckoutForm;
