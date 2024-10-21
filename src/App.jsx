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
      .then(data => {
        localStorage.setItem('contact', JSON.stringify(data))
        setContact(data)
      })
      .catch(err => alert(err.message))
  }, [])

  useEffect(() => {
    const lsContacts = JSON.parse(localStorage.getItem('contact'))
    if (!search.length) {
      setContact(lsContacts)
    } else {
      setContact(lsContacts.filter(c => {
        return (
          c.first_name.toLowerCase().includes(search.toLowerCase()) ||
          c.last_name.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase()) ||
          c.phone.replaceAll('-', '').includes(search.replaceAll(' ', '').replaceAll('-', ''))
        )
      }))
    }
  }, [search])

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
            contact?.length > 0 ? (
              contact.map((item) => (
                <tr key={item.id}>
                  <td style={{ borderCollapse: 'collapse', border: "1px solid #80808033", fontSize: "1rem" }}>{item.first_name}</td>
                  <td style={{ borderCollapse: 'collapse', border: "1px solid #80808033", fontSize: "1rem" }}>{item.last_name}</td>
                  <td style={{ borderCollapse: 'collapse', border: "1px solid #80808033", fontSize: "1rem" }}>{item.email}</td>
                  <td style={{ borderCollapse: 'collapse', border: "1px solid #80808033", fontSize: "1rem" }}>{item.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ textAlign: "center", padding: "30px 0 30px 0", borderWidth: "1px", borderInline: "solid", borderColor: "#80808033", fontSize: "30px", fontStyle: "italic" }} colSpan="4"> Not Found</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default App;