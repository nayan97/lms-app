import React from 'react';
import UserSidebar from '../../components/Shared/UserSidebar';
import CourceEnroled from './CourseEnroled';
import Layout from '../../components/Shared/Layout';

const CoursesEnroled = () => {
    return (
        <Layout>
              <section className='section-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='d-flex justify-content-between  mt-5 mb-3'>
                            <h2 className='h4 mb-0 pb-0'>My Learning</h2>
                            {/* <a href="#" className='btn btn-primary'>Create</a> */}
                        </div>
                        <div className='col-lg-3 account-sidebar'>
                           <UserSidebar/>
                        </div>
                        <div className='col-lg-9'>
                            <div className='row gy-4'>
                                <CourceEnroled/>
                                <CourceEnroled/>
                                <CourceEnroled/>
                                <CourceEnroled/>
                                <CourceEnroled/>                                
                                <CourceEnroled/>                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default CoursesEnroled;