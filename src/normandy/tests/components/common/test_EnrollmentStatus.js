import React from 'react';
import { mount } from 'enzyme';
import EnrollmentStatus from 'normandy/components/common/EnrollmentStatus';
import { wrapMockStore } from 'normandy/tests/mockStore';

describe('<EnrollmentStatus>', () => {
  it('should work', () => {
    const wrapper = () =>
      mount(wrapMockStore(<EnrollmentStatus recipe={{}} />));
    expect(wrapper).not.toThrow();
  });

  it('should print `disabled` if the recipe is not enabled', () => {
    const recipe = { enabled: false };
    const wrapper = mount(wrapMockStore(<EnrollmentStatus recipe={recipe} />));
    expect(wrapper.text()).toContain('Disabled');

    // throw new Error('asdf ' + wrapper.html)
    expect(wrapper.find('i.status-icon').props().className).toContain(
      'anticon-minus',
    );
  });

  it('should print `active` if the recipe is enabled and NOT paused', () => {
    const recipe = { enabled: true, arguments: { isEnrollmentPaused: false } };
    const wrapper = mount(wrapMockStore(<EnrollmentStatus recipe={recipe} />));
    expect(wrapper.text()).toContain('Active');
    expect(wrapper.find('i.status-icon').props().className).toContain(
      'anticon-check',
    );
  });

  it('should print `paused` if the recipe is enabled and paused', () => {
    const recipe = { enabled: true, arguments: { isEnrollmentPaused: true } };
    const wrapper = mount(wrapMockStore(<EnrollmentStatus recipe={recipe} />));
    expect(wrapper.text()).toContain('Paused');
    expect(wrapper.find('i.status-icon').props().className).toContain(
      'anticon-pause',
    );
  });

  it('should add a "lowkey" class when the recipe is disabled', () => {
    const recipe = { enabled: false };
    const wrapper = mount(wrapMockStore(<EnrollmentStatus recipe={recipe} />));
    expect(wrapper.find('NormandyLink.status-link').props().className).toContain(
      'is-lowkey',
    );
  });
});
