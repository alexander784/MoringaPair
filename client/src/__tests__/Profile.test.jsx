import React from 'react';
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../components/Profile';

describe('Profile component', () => {
    it('renders without crashing',() => {
        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>

        );
    });

    it('logs out user when Logout button is clicked', async ()=> {
        global.fetch = jest.fn(() => 
        Promise.resolve({
            ok:true,
            json: () => Promise.resolve({ message: 'Logged out'}),
        }),
    );
    })
 })
