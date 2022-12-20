import { render, screen } from '@testing-library/react';
import DeviceList from './list';


test('renders learn react link', () => {
    render(<DeviceList />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});