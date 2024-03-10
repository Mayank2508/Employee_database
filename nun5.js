const express=require('express');

const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const id=new ObjectId();
const app=express();
const port=3000;
const uri="mongodb+srv://Mayank2508:Mayank2508@mydb.lgxhyxm.mongodb.net/?retryWrites=true&w=majority&appName=MyDb";

const client=new MongoClient(uri);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// async function getall(){
//     await client.connect();
//     const database= client.db('Employee');
//     const collection= database.collection('newemployee');
//     const fulldata=await collection.find().toArray();
//     console.log(fulldata);

// }

// getall();
app.get('/api/data',async (req,res)=>{
    try {
        await client.connect();

        // Access the 'Employee' database and the 'newemployee' collection
        const database = client.db('Employee');
        const collection = database.collection('newemployee');

        // Retrieve all documents from the collection
        const fulldata = await collection.find().toArray();

        // Send the fetched data as a JSON response
        res.json(fulldata);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
        
    }
})


app.put('/api/data/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Check if id exists
    if (!id) {
      return res.status(400).json({ message: "Invalid request parameter: id is missing" });
    }

    await client.connect();
    const database = client.db('Employee');
    const collection = database.collection('newemployee');
    
    // Fetch the original employee data from the database
    const employee = await collection.findOne({ _id: new ObjectId(id) });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Extract the original salary and position
    const originalSalary = employee.salary;
    const originalPosition = employee.position;
    const originallocation=employee.location;

    // Check if salary or position needs to be updated
    let updatedlocation=originallocation;
    let updatedSalary = originalSalary;
    let updatedPosition = originalPosition;

    if (req.body) {
      // Update salary if provided and different from original
      if (req.body.salary && req.body.salary !== originalSalary) {
        updatedSalary = req.body.salary;
      }

      // Update position if provided and different from original
      if (req.body.position && req.body.position !== originalPosition) {
        updatedPosition = req.body.position;
      }
      if (req.body.location && req.body.location !== originallocation) {
        updatedlocation = req.body.location;
      }
    }

    // Perform update if either salary or position has changed
    if (updatedSalary !== originalSalary || updatedPosition !== originalPosition || updatedlocation!==originallocation) {
      const updatedEmployee = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { salary: updatedSalary, position: updatedPosition,location: updatedlocation } },
        { returnDocument: 'after' }
      );

      if (!updatedEmployee.value) {
        return res.status(404).json({ message: "Employee not found" });
      }

      return res.json(updatedEmployee.value);
    } else {
      // No changes in salary or position
      return res.json(employee);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  } 
});


app.post('/api/data',async(req,res)=>{
  try {
    const { name, position, location } = req.body;
    await client.connect();
    const database = client.db('Employee');
    const collection = database.collection('newemployee');
    const result = await collection.insertOne({
      name: name,
      position: position,
      location: location
    });
    res.status(201).json({message:'Data added successfully'});

  }  catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})




  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

