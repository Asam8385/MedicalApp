import React from 'react';
import userImg from '../../images/avatar.jpg';
import { Button } from 'antd';

const BlogComment = () => {
    return (
        <div className='mx-3' style={{ marginTop: '7rem' }}>
            <div className="mx-auto" style={{ marginTop: '7rem', marginBottom: '7rem' }}>

                <div className="card mb-5 p-3 shadow border-0">
                    <form className="row form-row">
                        <div className="col-md-6">
                            <div className="form-group mb-2 card-label">
                                <label>First Name</label>
                                <input placeholder='First Name' className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-2 card-label">
                                <label>Last Name</label>
                                <input placeholder='Last Name' className="form-control" />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group mb-2 card-label">
                                <label>Subject</label>
                                <input placeholder='Subject' className="form-control" />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group mb-2 card-label">
                                <label>Comment</label>
                                <textarea placeholder='Your Comment' className="form-control" rows={5} />
                            </div>
                        </div>

                        <div className='text-center my-3'>
                            <Button htmlType='submit' type="primary" size='large'>
                                Comment
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BlogComment