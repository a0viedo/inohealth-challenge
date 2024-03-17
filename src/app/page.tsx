'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import type { PersonMetadataJSON } from '@/lib/types';

export default function Home() {
  const [data, setData] = useState<PersonMetadataJSON[]>([]);

  useEffect(() => {
    fetchDataAndSet('/api/get-data');
  }, []);

  async function fetchDataAndSet(
    url: string,
    method: 'GET' | 'POST' = 'GET',
    reset = false
  ) {
    try {
      const response = await fetch(url, { method });
      if (!response.ok)
        throw new Error(`Network response was not ok: ${response.status}`);
      if (reset) {
        setData([]);
      } else {
        const newData = await response.json();
        setData(currentData => [...currentData, ...newData]);
        console.info(`Fetched ${newData.length} new rows.`);
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex space-x-2">
        <Button
          variant="outline"
          onClick={() => fetchDataAndSet('/api/reset', 'POST', true)}
        >
          Reset
        </Button>
        <Button
          variant="outline"
          onClick={() => fetchDataAndSet('/api/get-data')}
        >
          Add new data
        </Button>
      </div>
      <Table>
        <TableCaption>List of metatadata</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Client id</TableCell>
            <TableCell>Date testing</TableCell>
            <TableCell>Date birthdate</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Ethnicity</TableCell>
            <TableCell>Creatine</TableCell>
            <TableCell>Chloride</TableCell>
            <TableCell>Fasting glucose</TableCell>
            <TableCell>Potassium</TableCell>
            <TableCell>Sodium</TableCell>
            <TableCell>Total calcium</TableCell>
            <TableCell>Total protein</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={`${index}-${item.clientId}`}>
              <TableCell>{item.clientId}</TableCell>
              <TableCell>{formatDate(item.dateTesting)}</TableCell>
              <TableCell>{formatDate(item.dateBirthdate)}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.ethnicity}</TableCell>
              <TableCell>
                {item.creatine} {item.creatineUnit}
              </TableCell>
              <TableCell>
                {item.chloride} {item.chlorideUnit}
              </TableCell>
              <TableCell>
                {item.fastingGlucose} {item.fastingGlucoseUnit}
              </TableCell>
              <TableCell>
                {item.potassium} {item.potassiumUnit}
              </TableCell>
              <TableCell>
                {item.sodium} {item.sodiumUnit}
              </TableCell>
              <TableCell>
                {item.totalCalcium} {item.totalCalciumUnit}
              </TableCell>
              <TableCell>
                {item.totalProtein} {item.totalProteinUnit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
