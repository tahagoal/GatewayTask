import { render, screen } from '@testing-library/react';
import GatewayList from './list';


test('renders learn react link', () => {
    render(<GatewayList />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});