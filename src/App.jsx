import { Form, InputGroup } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {

  const [contact, setContact] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('./data.json')
      .then(res => res.json())
      .then(data => { setContact(data) })
      .catch(err => alert(err.message))
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className='container'>
      <h1 className='text-center mt-4'>Contact Keeper</h1>
      <Form>
        <InputGroup className='my-3'>
          <Form.Control
            placeholder='Search contacts'
            value={search}
            onChange={handleChange}
          />
        </InputGroup>
      </Form>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">SurName</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {
            contact?.filter((item) =>
              item.first_name.toLowerCase().includes(search.toLowerCase())
            ).length > 0 ? (
              contact?.filter((item) =>
                item.first_name.toLowerCase().includes(search.toLowerCase())
              ).map((item) => (
                <tr key={item.id}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <th>{item.phone}</th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4"> Not Found</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default App;