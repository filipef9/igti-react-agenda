import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import { ICalendar } from './backend';

const DAYS_OF_WEEK = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

const useStyles = makeStyles({
  table: {
    borderTop: '1px solid rgb(224, 224, 224)',
    minHeight: '100%',
    '& td ~ td, & th ~ th': {
      borderLeft: '1px solid rgb(224, 224, 224)',
    },
  },
});

interface ICalendarCell {
  dateAsIsoString: string;
}

const generateCalendar = (dateAsYyyyMMdd: string): ICalendarCell[][] => {
  let weeks: ICalendarCell[][] = [];
  const aDate = new Date(`${dateAsYyyyMMdd}T12:00:00`);
  const currentMonth = aDate.getMonth();

  const firstDayOfCalendar = new Date(aDate.valueOf());
  firstDayOfCalendar.setDate(1);

  const dayOfWeek = firstDayOfCalendar.getDay();

  firstDayOfCalendar.setDate(1 - dayOfWeek);

  const currentDay = new Date(firstDayOfCalendar.getTime());
  do {
    let week: ICalendarCell[] = [];
    for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
      const isoDate = `${currentDay.getFullYear()}-${(currentDay.getMonth() + 1).toString().padStart(2, '0')}-${(currentDay.getDate()).toString().padStart(2, '0')}`;
      week = [
        ...week,
        { dateAsIsoString: isoDate }
      ];
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks = [
      ...weeks,
      week
    ];
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
};

const getToday = (): string => {
  return '2021-06-17';
};

const CalendarScreen = () => {
  const classes = useStyles();
  const weeks = generateCalendar(getToday());

  return (
    <Box display="flex" height="100%" alignItems="stretch">
      <Box borderRight="1px solid rgb(224, 224, 224)" width="16em" padding="8px 16px">
        <h2>Agenda React</h2>
        <Button variant="contained" color="primary">
          Novo evento
        </Button>

        <Box marginTop="64px">
          <h3>Agendas</h3>
          <FormControlLabel control={<CheckBox />} label="Pessoal" />
          <FormControlLabel control={<CheckBox />} label="Trabalho" />
        </Box>
      </Box>
      <TableContainer component={'div'}>
        <Box display="flex" alignItems="center" padding="8px 16px">
          <Box>
            <IconButton aria-label="Mês anterior">
              <Icon>chevron_left</Icon>
            </IconButton>
            <IconButton aria-label="Próximo mês">
              <Icon>chevron_right</Icon>
            </IconButton>
          </Box>
          <Box flex="1" component="h3" marginLeft="16px">
            Junho de 2021
          </Box>
          <IconButton aria-label="Usuário">
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
          </IconButton>
        </Box>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {DAYS_OF_WEEK.map((day) => (
                <TableCell key={day} align="center">
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {weeks.map((week, index) => (
              <TableRow key={index}>
                {week.map((cell) => (
                  <TableCell key={cell.dateAsIsoString} align="center">
                    { cell.dateAsIsoString }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CalendarScreen;
