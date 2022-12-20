import { render, screen } from '@testing-library/react';
import GatewayAdd from './add';


test('renders learn react link', () => {
    render(<GatewayAdd />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});