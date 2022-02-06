import React from 'react'

function activeOrders() {
    return (
        <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-table me-1" />
                Currently Active Orders
              </div>
              <div className="card-body table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S.no.</th>
                      <th>Table No.</th>
                      <th>Table Id</th>
                      <th>Number Of Members</th>
                      <th>Menu Orders</th>
                      <th>Total Bill</th>
                      {/* <th /> */}
                    </tr>
                  </thead>
                  {/* <tfoot>
                    <tr>
                      <th>Table No.</th>
                      <th>Table Id</th>
                      <th>number of Members</th>
                      <th>status of Table</th>
                      <th>Change Table status</th>
                      <th />
                    </tr>
                  </tfoot> */}

                  {/* <!--Table body--> */}
                  <tbody>
                    <tr className="table-info">
                      <th scope="row">1</th>
                      <td>10</td>
                      <td>Moss</td>
                      <td>5</td>
                      <td>manchurian 1p, chinese 1p</td>
                      <td>500$</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>11</td>
                      <td>Wintour</td>
                      <td>1</td>
                      <td>water</td>
                      <td>50$</td>
                    </tr>
                    <tr className="table-info">
                      <th scope="row">3</th>
                      <td>12</td>
                      <td>Bond</td>
                      <td>3</td>
                      <td>maggie 2p</td>
                      <td>60$</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Jerry</td>
                      <td>Horwitz</td>
                      <td>Italy</td>
                      <td>vacant</td>
                      <td>5$</td>
                    </tr>
                    <tr className="table-info">
                      <th scope="row">5</th>
                      <td>Janis</td>
                      <td>Joplin</td>
                      <td>Poland</td>
                      <td>vacant</td>
                      <td>5$</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>Gary</td>
                      <td>Winogrand</td>
                      <td>Germany</td>
                      <td>vacant</td>
                      <td>5$</td>
                    </tr>
                    <tr className="table-info">
                      <th scope="row">7</th>
                      <td>Angie</td>
                      <td>Smith</td>
                      <td>USA</td>
                      <td>vacant</td>
                      <td>5$</td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td>John</td>
                      <td>Mattis</td>
                      <td>France</td>
                      <td>vacant</td>
                      <td>5$</td>
                    </tr>
                    <tr className="table-info">
                      <th scope="row">9</th>
                      <td>Otto</td>
                      <td>Morris</td>
                      <td>Germany</td>
                      <td>vacant</td>
                      <td>5$</td>
                    </tr>
                  </tbody>
                  {/* <!--Table body--> */}
                </table>
              </div>
            </div>
    )
}

export default activeOrders
