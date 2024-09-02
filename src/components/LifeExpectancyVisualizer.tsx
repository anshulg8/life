import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Input,
  Spinner,
  Table,
  Tbody,
  Tr,
  Td,
  VStack,
  Text,
  HStack,
  Progress,
  Link,
} from "@chakra-ui/react";
import dayjs from "dayjs";

const weeksInYear = 52;

const LifeExpectancyVisualizer: React.FC = () => {
  const [birthDate, setBirthDate] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState(80);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [weeksData, setWeeksData] = useState<boolean[][]>([]);
  const [currentAge, setCurrentAge] = useState<number | null>(null);
  const [metrics, setMetrics] = useState<{
    totalWeeks: number;
    weeksPassed: number;
    weeksRemaining: number;
    percentageCompleted: number;
  } | null>(null);

  const calculateWeeks = () => {
    if (!birthDate) return;

    const birth = dayjs(birthDate);
    const today = dayjs();
    const years = lifeExpectancy;
    const age = today.diff(birth, "year");
    setCurrentAge(age);

    const totalWeeks = years * weeksInYear;
    let weeksPassed = 0;

    const newWeeksData: boolean[][] = [];

    for (let i = 0; i < years; i++) {
      const yearStart = birth.add(age - (age - i), "year");
      const yearWeeks: boolean[] = [];

      for (let week = 0; week < weeksInYear; week++) {
        const weekStart = yearStart.add(week, "week");
        const isPassed = weekStart.isBefore(today);
        yearWeeks.push(isPassed);
        if (isPassed) weeksPassed++;
      }

      newWeeksData.push(yearWeeks);
    }

    const weeksRemaining = totalWeeks - weeksPassed;
    const percentageCompleted =
      totalWeeks === 0 ? 0 : (weeksPassed / totalWeeks) * 100;

    setWeeksData(newWeeksData);
    setMetrics({
      totalWeeks,
      weeksPassed,
      weeksRemaining,
      percentageCompleted,
    });
    setSubmitted(true);
    setLoading(false);
  };

  const formatAge = (ageNow: number) => {
    const currentYear = dayjs().year();
    const startYear = dayjs(birthDate).year();
    const year = startYear + ageNow;

    if (year === currentYear) {
      return "You are here";
    } else if (ageNow === 0) {
      return "Birth";
    } else {
      return `Year ${ageNow + 1}`;
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      calculateWeeks();
    }, 250); // Simulate a delay
  };

  return (
    <VStack spacing={4} align="start">
      <Text fontSize="2xl" fontWeight="bold">
        Life Expectancy Visualizer
      </Text>

      <Text fontSize="lg" fontWeight="normal">
        Inspiration Source:{" "}
        <Link
          href="https://waitbutwhy.com/2014/05/life-weeks.html"
          color="blue.500"
          isExternal
        >
          Your Life in Weeks
        </Link>{" "}
        by Tim Urban
      </Text>

      <Text fontWeight="bold" mb={1}>
        Date of Birth
      </Text>
      <Input
        placeholder="Enter your date of birth (YYYY-MM-DD)"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        type="date"
      />
      <Text mt={2} fontWeight="bold" mb={1}>
        Life Expectancy (in years)
      </Text>
      <Input
        placeholder="Enter your life expectancy (in years)"
        value={lifeExpectancy}
        onChange={(e) => setLifeExpectancy(Number(e.target.value))}
        type="number"
      />
      <Button onClick={handleSubmit} colorScheme="blue" width="100%">
        Submit
      </Button>
      {loading && <Spinner size="lg" />}
      {submitted && !loading && (
        <>
          <Box overflowX="auto" w="100%">
            <Text>
              Total Weeks: {metrics?.totalWeeks}
              <br />
              Weeks Passed: {metrics?.weeksPassed}
              <br />
              Weeks Remaining: {metrics?.weeksRemaining}
            </Text>
            <Text mt={4} fontSize="lg">
              Life Completion Percentage:
            </Text>
            <Progress
              value={metrics?.percentageCompleted || 0}
              colorScheme="blue"
              size="md"
              hasStripe
              isAnimated
            />
            <Text mt={2} fontSize="sm">
              {metrics?.percentageCompleted.toFixed(2)}%
            </Text>
          </Box>
          <Box overflowX="auto" w="100%">
            <Table variant="simple" size="sm">
              <Tbody>
                {weeksData.map((yearWeeks, index) => (
                  <Tr
                    key={index}
                    bg={index === currentAge ? "blue.100" : undefined} // Highlight the current age row
                  >
                    <Td
                      fontWeight="bold"
                      width="70px"
                      color={index === currentAge ? "blue.700" : undefined} // Change color for current year
                    >
                      {formatAge(index)}
                    </Td>
                    <Td>
                      <HStack
                        spacing={1}
                        flexWrap="wrap"
                        justifyContent="flex-start"
                      >
                        {yearWeeks.map((weekPassed, weekIdx) => (
                          <Checkbox
                            key={weekIdx}
                            isChecked={weekPassed}
                            isReadOnly
                            size="sm"
                            colorScheme={weekPassed ? "blue" : "gray"}
                          />
                        ))}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
      <Text mt={6} fontSize="sm" color="gray.600">
        Disclaimer: This tool provides a visual representation of your life
        expectancy based on the data provided. It is for informational purposes
        only and should not be used as a substitute for professional advice or
        guidance.
      </Text>
    </VStack>
  );
};

export default LifeExpectancyVisualizer;
