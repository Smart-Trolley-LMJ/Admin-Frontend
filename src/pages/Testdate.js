import React from 'react'

function Testdate() {
  return (
    <div>
       <input
                      type="text"
                      name="name"
                      class="form-control"
                      id="name"
                      placeholder="Product Name"
                      // isInvalid={!!errors.name}
                      isInvalid= {true}
                      required
                    
                    />
    </div>
  )
}

export default Testdate
