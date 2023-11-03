import { useEffect, useState, useRef, FormEvent } from 'react';
import { FiTrash } from 'react-icons/fi';
import { api } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomerProps, ToastError} from '../types';
import ButtonRegister from '../components/ButtonRegister';
import InputData from '../components/InputData';

function Customer() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadCustomers = async () => {
      const response = await api.get('/customers');
      setCustomers(response.data);
    };

    loadCustomers();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!nameRef.current?.value || !emailRef.current?.value) {
      return toast.error("Digite um Nome e/ou Email válido!");
    }

    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (emailRegex.test(emailRef.current?.value) !== true) return toast.error("Digite um Email válido!");

    const response = await api.post('/customer', {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    });

    setCustomers(allCustomers => [...allCustomers, response.data]);

    nameRef.current.value = '';
    emailRef.current.value = '';

    toast.success("Cliente cadastrado com sucesso!");
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete('/customer', {
        params: {
          id: id,
        }
      });

      const allCustomers = customers.filter((custumer) => custumer.id !== id);
      setCustomers(allCustomers);
      toast.success('Cliente deletado com sucesso!');
    } catch (error) {
      const toastError = error as ToastError;
      toast.error(toastError.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <ToastContainer />
        <h1 className="text-4xl font-medium text-white text-center my-4">Customers</h1>
        
        <form className="flex flex-col my-6" onSubmit={ handleSubmit } >
          <InputData type="text" nameLabel="Name" nameRef={nameRef} />
          <InputData type="email" nameLabel="Email" nameRef={emailRef} />
          <ButtonRegister />
        </form>

        <section className="flex flex-col gap-4">
          {customers.map((customer) => (
            <article key={ customer.id } className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
              <p><span className="font-medium">Name: </span> { customer.name }</p>
              <p><span className="font-medium">Email: </span> { customer.email }</p>
              <p><span className="font-medium">Status: </span> { customer.status ? 'Ativo' : 'Inativo'}</p>

              <button
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                onClick={ () => handleDelete(customer.id) }
              >
                <FiTrash size={ 18 } color="#fff"/>
              </button>
            </article>
          ))}
        </section>

      </main>
    </div>
  );
}

export default Customer;
  