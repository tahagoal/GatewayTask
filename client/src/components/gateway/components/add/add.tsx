import { Card, Container, Row, Toast } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from "axios";
import GateWay from 'src/models/gateway.model';
import { useState } from 'react';

function GatewayAdd() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { t } = useTranslation();
    const [show, setShow] = useState(false);

    const onSubmit = (data:any) => {
      const gateWay: GateWay = new GateWay(data.serialNumber, data.gatewayName, data.ipAddress);

      axios
      .post(`${process.env.REACT_APP_MY_ENV_VARIABLE}gateways`, gateWay)
      .then(data => {
        setShow(true);
      })
      .catch(error => console.log(error));
    }
    
  return (
    <main>
      <Toast bg="success" onClose={() => setShow(false)} show={show} delay={3000} autohide style={{ position: "absolute", zIndex: "1000" }}>
        <Toast.Body className='text-white'>Gateway Created Successfully</Toast.Body>
      </Toast>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <div className="col-md-12">
                <h2 className="pt-3 pb-4 text-center font-bold font-up deep-purple-text">{t('addGateway')}</h2>
              </div>
            </Row>
            <div className="row">
              <div className="col mb-4">
                <button type="button" className="btn btn-primary float-end">
                  <Link className='text-white' to="/gateway/list">{t('backtoList')}</Link>
                </button>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-6 justify-content-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label className='mb-2 float-start'>{t('serial')}</label>
                    <input type="text" 
                      className="form-control"
                      id="serialNumber"
                      {...register("serialNumber", {required: true})} 
                      />
                    <small className="form-text text-muted">{t('uniqueSerial')}</small>
                    <div className='col-sm-12'>
                      {errors.serialNumber && <small className="text-danger">{t('requiredField')}</small>}
                    </div>
                  </div>

                  <div className="form-groupt mt-3">
                    <label className='mb-2 float-start'>{t('name')}</label>
                    <input type="text" 
                      className="form-control"
                      id="gatewayName"
                      {...register("gatewayName", {required: true})}
                      />
                    <div className="col-sm-12">
                      <small className="text-danger">
                        {errors.gatewayName && <small className="text-danger">{t('requiredField')}</small>}
                      </small>
                    </div>
                  </div>

                  <div className="form-group mt-3">
                    <label className='mb-2 float-start'>{t('ip')}</label>
                    <input type="text" 
                      className="form-control"
                      id="ipAddress"
                      {...register("ipAddress", {required: "true",
                        pattern: {
                          value: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i,
                          message: 'invalid',
                        }
                      })}
                      />
                    <div className="col-sm-12 mt-3">
                      <small className="text-danger" >
                        {errors.ipAddress?.type == 'required' && <small className="text-danger">{t('requiredField')}</small>}
                      </small>
                      <small className="text-danger">
                        {errors.ipAddress?.type == 'pattern' && <small className="text-danger">{t('invalidIP')}</small>}
                      </small>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">{t('submit')}</button>
                </form>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </main>
  )
}

export default GatewayAdd
