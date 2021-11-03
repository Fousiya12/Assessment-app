import React, { useState, Fragment } from 'react'
import AddItemForm from './Forms/AddItemForm'
import EditItemForm from './Forms/EditItemForm'
//import ItemTable from './components/ItemTable'
import { Table } from './components/Table'
import './styles.css'


const App = () => {


  const columns = [
    { accessor: 'id', label: 'Id' },
    { accessor: 'name', label: 'Name' },
    { accessor: 'description', label: 'Description', },
    { accessor: 'price', label: 'Price' },
    { accessor: 'quantity', label: 'Quantity' },
    { accessor: 'date', label: 'Date' },
    
  ]

	// Data
	const ItemData = [
		{ id: 1, name: 'T-Shirt', description: 't-shirt' , price:4000 , quantity :20 ,date:'16/06/2021'},
		{ id: 2, name: 'Saree', description: 'cotton' , price:5000 , quantity :50 ,date:'18/03/2021'},
		{ id: 3, name: 'Jeans', description: 'denim' , price:2500 , quantity :15 ,date:'16/06/2021'},
    { id: 4, name: 'Skirt', description: 'cotton' , price:10000 , quantity :75 ,date:'18/03/2021'},
    { id: 5, name: 'Shirt', description: 'cotton' , price:5000 , quantity :25 ,date:'16/06/2021'},
    { id: 6, name: 'Top', description: 'kurthi' , price:7000 , quantity :10 ,date:'20/02/2021'},
	]

	const initialFormState = { id: null, name: '', description: '' ,price:null, quantity:null,date:''}

	// Setting state
	const [ items, setItems ] = useState(ItemData)
	const [ currentItem, setCurrentItem ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addItem = item => {
		item.id = items.length + 1
		setItems([ ...items, item ])
	}

	const deleteItem = id => {
		setEditing(false)

		setItems(items.filter(item => item.id !== id))
	}

	const updateItem = (id, updatedItem) => {
		setEditing(false)

		setItems(items.map(item => (item.id === id ? updatedItem : item)))
	}

	const editRow = item => {
		setEditing(true)

		setCurrentItem({ id: item.id, name: item.name, description: item.description,price:item.price,quantity:item.quantity,date:item.date })
	}

	return (
		<div className="container">
			<h1>High Fashions </h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit Item</h2>
							<EditItemForm
								editing={editing}
								setEditing={setEditing}
								currentItem={currentItem}
								updateItem={updateItem}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add Items</h2>
							<AddItemForm addItem={addItem} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View Items</h2>
					{/* <ItemTable items={items} editRow={editRow} deleteItem={deleteItem} /> */}
          <Table rows={items} columns={columns} editRow={editRow} deleteItem={deleteItem} />
				</div>
			</div>
		</div>
	)
}

export default App
