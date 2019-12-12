import React from 'react';
import { shallow } from 'enzyme';
import Create from './Create';
import cherryService from '../../../services/cherry-service';

describe('Create component', () => {
    it('should create correct component', () => {
        const wrapper = shallow(<Create />);
        expect(wrapper).toBeTruthy();
    })
    it('should checks for html changes', () => {
        const wrapper = shallow(<Create />);
        expect(wrapper).toMatchSnapshot();
    })
    // it("should create sort successfully", (done) => {
    //     const history = { push: () => {} };
    //     // const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { value: 123 } });
    //      const spy = jest.spyOn().mockReturnValueOnce({ 
    //          sort: { value: 123 },
    //          price: { value: 1 },
    //          imagePath: { value: 1234 },
    //          description: { value: 12 },
    //          checkBox: { value: false }
    //          });
    //     const historyPushSpy = jest.spyOn(history, 'push');
    //     const createSortSpy = jest.spyOn(cherryService, 'postCreate').mockImplementationOnce(() => Promise.resolve());;
      
    //     const wrapper = shallow(<Create history={history}/>);
    //     wrapper.find('button').simulate('click');
      
    //     expect(spy).toHaveBeenCalledTimes(1);
    //     expect(createSortSpy).toHaveBeenCalledTimes(1);
    //     // expect(createSortSpy).toHaveBeenCalledWith({ description: 123 });
    //     Promise.resolve().then(() => {
    //       expect(historyPushSpy).toHaveBeenCalledTimes(1);
    //       done();
    //     //   useRefSpy.mockClear();
    //     });
    //   });
})