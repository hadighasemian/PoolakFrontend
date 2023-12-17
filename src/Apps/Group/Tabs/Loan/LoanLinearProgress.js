import {createTheme, ThemeProvider} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
const theme = createTheme({
    components: {
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 10, // Change the height of the progress bar
                    borderRadius: 5, // Add rounded corners to the progress bar
                    backgroundColor: '#d9d9db', // Add rounded corners to the progress bar
                },
                bar1Buffer:{
                    borderRadius: 5, // Add rounded corners to the bar itself
                    backgroundColor: '#679436', // Change the progress bar color
                },
                dashedColorPrimary:{
                    borderRadius: 2, // Add rounded corners to the bar itself
                },
                bar: {
                    borderRadius: 5, // Add rounded corners to the bar itself
                    backgroundColor: '#f5e306', // Change the progress bar color
                },
                dashed: {

                    backgroundSize: '0rem 0rem', // Adjust the size of the dashes
                },
            },
        },
    },
});
function LoanLinearProgress({paid,time}) {
    return(
        <div className="row px-3">
            <ThemeProvider theme={theme}>
                <LinearProgress
                    variant="buffer"
                    value={paid} valueBuffer={time} />
            </ThemeProvider>
        </div>
    )
}
export default LoanLinearProgress;