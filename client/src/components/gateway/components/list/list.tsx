import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import GateWay from 'src/models/gateway.model';
import axios from "axios";


function GatewayList() {

  const [gateways, setGateway] = useState([]);

  useEffect(() => {

    const getallGetways = async () => {
      await axios
      .get(`${process.env.REACT_APP_MY_ENV_VARIABLE}gateways`)
      .then(data => {
        setGateway(data.data);
      })
      .catch(error => console.log(error));
    }

    getallGetways();

  }, [])
    
  const { t } = useTranslation();
    
  return (
    <main>
      <div className="container mt-4">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <h2 className="pt-3 pb-4 text-center font-bold font-up deep-purple-text">{t('gatewaytable')}</h2>
              </div>
            </div>
            <div className="row">
              <div className="col mb-4">
                <button type="button" className="btn btn-primary float-right">
                  <Link className='text-white' to="/gateway/add">
                    {t('addGateway')}
                  </Link>
                </button>
              </div>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t('serial')}</th>
                  <th>{t('name')}</th>
                  <th>{t('ip')}</th>
                  <th>{t('gatewaydev')}</th>
                  <th>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {gateways.map((gateway: GateWay, index: number) => (
                  <tr key={gateway._id}>
                    <td>{index+1}</td>
                    <td>{gateway.serial}</td>
                    <td>{gateway.name}</td>
                    <td>{gateway.IP}</td>
                    <td><button type="button" className="btn btn-success">
                      <Link className='text-white' to={'/devices/list/'+gateway._id}>{t('devices')}</Link>
                    </button></td>
                    <td><button type="button" className="btn btn-success">
                      <Link className='text-white' to={'/devices/add/'+gateway._id}>{t('addDevice')}</Link>
                    </button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </main>
  )
}

export default GatewayList